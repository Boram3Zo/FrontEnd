# 회원 인증 API 문서

이 문서는 프론트엔드(React 등)에서 사용할 회원가입, 로그인, 로그아웃 API 명세를 제공합니다.

---

## 1. 회원가입

- **URL**: `/member/signup`
- **Method**: `POST`
- **Request Body (JSON)**:
  ```json
  {
  	"email": "user@example.com",
  	"password": "비밀번호",
  	"name": "닉네임"
  }
  ```
- **Response**:
  - **성공 (200 OK)**
    ```json
    "회원가입이 완료되었습니다."
    ```
  - **이메일 중복 (409 Conflict)**
    ```json
    "이미 사용 중인 이메일입니다."
    ```
  - **실패 (500 Internal Server Error)**
    ```json
    "회원가입에 실패했습니다. 다시 시도해 주세요."
    ```

---

## 2. 로그인

- **URL**: `/member/login`
- **Method**: `POST`
- **Request Body (x-www-form-urlencoded 또는 JSON)**
  - 예시 (x-www-form-urlencoded):
    - email=user@example.com
    - password=비밀번호
- **Response**:
  - **성공 (200 OK)**
    ```json
    {
    	"memberId": 1,
    	"email": "user@example.com",
    	"name": "닉네임"
    }
    ```
    - JSESSIONID 세션 쿠키가 httpOnly로 발급됨 (credentials: 'include' 필요)
  - **실패 (401 Unauthorized)**
    ```json
    "로그인 실패: 이메일 또는 비밀번호가 올바르지 않습니다."
    ```
  - **입력값 누락 (400 Bad Request)**
    ```json
    "이메일과 비밀번호를 모두 입력해 주세요."
    ```

---

## 3. 로그아웃

- **URL**: `/member/logout`
- **Method**: `POST`
- **Request Header**: 세션 쿠키(JSESSIONID) 포함 (credentials: 'include')
- **Response**:
  - **성공 (200 OK)**
    ```json
    "로그아웃이 완료되었습니다."
    ```
  - **비로그인 상태 (401 Unauthorized)**
    ```json
    "이미 로그아웃된 상태이거나 로그인 정보가 없습니다."
    ```

---

## 4. 프론트엔드 연동 참고

- fetch/axios 요청 시 반드시 `credentials: 'include'` 옵션을 사용해야 세션이 유지됩니다.
- 모든 응답은 JSON 또는 문자열입니다. 상태코드와 메시지를 함께 확인하세요.
- 회원가입/로그인 시 입력값 유효성 검사를 프론트엔드에서도 수행하는 것이 좋습니다.

---

문의 및 추가 API가 필요하면 백엔드 개발자에게 요청해 주세요.
