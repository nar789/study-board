# Study-board

- 실습을 위한 게시판 샘플
- [영상 학습 자료](https://www.youtube.com/watch?v=6IK-yF6t1RE)

## 1. Usage

- 프로젝트 폴더에 config.js 파일생성

```
    // config.js
    module.exports = {
        host : 'localhost',
        user : 'root',
        password : mysql설치 시 설정했던 루트 비밀번호,
        database : 'msgui'
    };
```

- 모듈 설치

```
    npm install
```

- 프로젝트 실행

```
    node index.js  // localhost:3325 접속
```
