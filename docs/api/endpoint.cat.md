# Cat API 문서

고양이(Cat) 관련 REST API 엔드포인트 및 사용 예시입니다.

## Base URL
`/cat`

---

## 1. 전체 고양이 목록 조회
- **Method:** GET
- **URL:** `/cat`
- **Request Body:** 없음
- **Response:**
  - 200 OK
  - `[CatDTO, ...]` (고양이 목록 배열)

### 예시
```http
GET /cat
```

---

## 2. 고양이 추가
- **Method:** POST
- **URL:** `/cat`
- **Request Body:**
  - `CatDTO` JSON
- **Response:**
  - 200 OK
  - 생성된 `CatDTO`

### 예시
```http
POST /cat
Content-Type: application/json

{
  "catName": "나비",
  "rarity": "Rare",
  "breed": "Korean Short Hair",
  "personality": "Friendly",
  "discoveredAt": "Seoul",
  "discoveredDate": "2025-09-18T12:00:00",
  "favoriteFood": "참치",
  "hobby": "낮잠",
  "description": "귀여운 고양이",
  "latitude": 37.5665,
  "longitude": 126.9780,
  "isDiscovered": true
}
```

---

## 3. 고양이 삭제
- **Method:** DELETE
- **URL:** `/cat/{catId}`
- **Request Body:** 없음
- **Response:**
  - 200 OK

### 예시
```http
DELETE /cat/1
```

---

## 4. 고양이 전체 수정
- **Method:** PUT
- **URL:** `/cat/{catId}`
- **Request Body:**
  - `CatDTO` JSON (모든 필드 포함)
- **Response:**
  - 200 OK
  - 수정된 `CatDTO`

### 예시
```http
PUT /cat/1
Content-Type: application/json

{
  "catName": "나비 수정",
  ...
}
```

---

## 5. 고양이 부분 수정
- **Method:** PATCH
- **URL:** `/cat/{catId}`
- **Request Body:**
  - 변경할 필드만 포함한 JSON
- **Response:**
  - 200 OK
  - 수정된 `CatDTO`

### 예시
```http
PATCH /cat/1
Content-Type: application/json

{
  "catName": "이름만 변경"
}
```

---

## CatDTO 예시
```json
{
  "catId": 1,
  "catName": "나비",
  "rarity": "Rare",
  "breed": "Korean Short Hair",
  "personality": "Friendly",
  "discoveredAt": "Seoul",
  "discoveredDate": "2025-09-18T12:00:00",
  "favoriteFood": "참치",
  "hobby": "낮잠",
  "description": "귀여운 고양이",
  "latitude": 37.5665,
  "longitude": 126.9780,
  "isDiscovered": true
}
```
