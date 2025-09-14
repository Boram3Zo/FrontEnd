#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const DOCS_DIR = path.join(__dirname, "..", "docs");
const TEMPLATES_DIR = path.join(DOCS_DIR, "templates");

// 문서 타입별 폴더 매핑
const TYPE_FOLDERS = {
	change: "changes",
	refactoring: "refactoring",
	feature: "features",
};

// 현재 날짜와 시간을 YYYY-MM-DD-HHMM 형식으로 반환
function getCurrentDateTime() {
	const now = new Date();
	const date = now.toISOString().split("T")[0];
	const time = now.toTimeString().slice(0, 5).replace(":", "");
	return `${date}-${time}`;
}

// 파일명을 안전하게 변환 (한글 → 영문, 공백 → 하이픈)
function sanitizeFileName(title) {
	return title
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9가-힣-]/g, "")
		.trim();
}

// 템플릿 파일을 읽고 기본값으로 치환
function createDocumentFromTemplate(type, title, description) {
	const templatePath = path.join(TEMPLATES_DIR, `${type}.md`);
	const targetFolder = path.join(DOCS_DIR, TYPE_FOLDERS[type]);

	if (!fs.existsSync(templatePath)) {
		console.error(`❌ 템플릿 파일을 찾을 수 없습니다: ${templatePath}`);
		return;
	}

	// 템플릿 읽기
	let template = fs.readFileSync(templatePath, "utf-8");

	// 기본값 치환
	const currentDateTime = getCurrentDateTime();
	const currentDate = currentDateTime.split("-").slice(0, 3).join("-"); // 문서 내용용 날짜
	template = template
		.replace(/\[작업 제목\]/g, title)
		.replace(/\[리팩토링 제목\]/g, title)
		.replace(/\[새 기능 제목\]/g, title)
		.replace(/YYYY-MM-DD/g, currentDate)
		.replace(/\[이름\]/g, process.env.USER || "Developer");

	// 설명이 있다면 개요 부분에 추가
	if (description) {
		template = template.replace(
			/### 문제 상황[\s\S]*?- 현재 문제점이나 개선이 필요한 부분을 구체적으로 설명/,
			`### 문제 상황\n- ${description}`
		);
	}

	// 파일명 생성 (시간 포함)
	const fileName = `${currentDateTime}-${sanitizeFileName(title)}.md`;
	const targetPath = path.join(targetFolder, fileName);

	// 폴더가 없으면 생성
	if (!fs.existsSync(targetFolder)) {
		fs.mkdirSync(targetFolder, { recursive: true });
	}

	// 파일 생성
	fs.writeFileSync(targetPath, template);

	console.log(`✅ 문서가 생성되었습니다: ${targetPath}`);
	console.log(`📝 에디터에서 열어서 내용을 완성해주세요!`);

	return targetPath;
}

// 대화형 문서 생성
function createInteractiveDocument() {
	console.log("\n📚 새 문서 생성기");
	console.log("================\n");

	rl.question("📋 문서 타입을 선택하세요 (change/refactoring/feature): ", type => {
		if (!TYPE_FOLDERS[type]) {
			console.error("❌ 올바른 타입을 입력하세요: change, refactoring, feature");
			rl.close();
			return;
		}

		rl.question("📝 작업 제목을 입력하세요: ", title => {
			if (!title.trim()) {
				console.error("❌ 제목을 입력해주세요.");
				rl.close();
				return;
			}

			rl.question("📖 간단한 설명을 입력하세요 (선택사항): ", description => {
				createDocumentFromTemplate(type, title.trim(), description.trim());
				rl.close();
			});
		});
	});
}

// 명령행 인자 처리
function main() {
	const args = process.argv.slice(2);

	if (args.length >= 2) {
		// 비대화형 모드: npm run docs:create change "제목"
		const [type, title, description = ""] = args;

		if (!TYPE_FOLDERS[type]) {
			console.error("❌ 올바른 타입을 입력하세요: change, refactoring, feature");
			process.exit(1);
		}

		createDocumentFromTemplate(type, title, description);
	} else if (args.length === 0) {
		// 대화형 모드
		createInteractiveDocument();
	} else {
		// 사용법 출력
		console.log("📚 문서 생성기 사용법");
		console.log("=================");
		console.log("");
		console.log("🔸 대화형 모드:");
		console.log("  npm run docs:create");
		console.log("");
		console.log("🔸 명령행 모드:");
		console.log("  npm run docs:create [타입] [제목] [설명?]");
		console.log("");
		console.log("📝 예시:");
		console.log('  npm run docs:create change "회원가입 메인화면 이동"');
		console.log('  npm run docs:create refactoring "API 에러처리 공통화"');
		console.log('  npm run docs:create feature "사진 업로드 기능" "사용자가 사진을 업로드할 수 있는 기능"');
	}
}

main();
