# Audio Clip Messenger 

This utility project is to allow users/teams to communicate with each other with short audio clip, which will be able to make teamwork more efficient.


![overview1](https://lh3.googleusercontent.com/yLT9mT4k8oifD7FCQta1b-UrvL2R08REbei8-nRIYdS8JH9DGLXMNZhkOTu6GZGL1XOyYtt4DloyZnO3Xxg4o15J_nKM6nUHaFr_bZc58FyIValeJ1TF2BC868aTI30TdLH8HaY4MUSSPq9_14PE8PSfVN6espmF6wWWjC1RawSjOtziAQWCONJ8-WWx4Jf7hsAET6QXlTPoU8roeefr1GxKaxclnPeTJGiZO_NvWB1spTPU6444SDlZthY6rQWtyklRbGeXf2L_Nvo-k4lc4t62O3J3zZoqc2YM0i3UCFne04adtmqqVO1C2vWFJHaIsImLRgFgMBxnpCU-sbwQma-q-ddDOZ4VdAswOkC6_-4h4WWkEfOnzUnZZdhLrG-7p3pdW3nv-s8XYSMhwUGNE8XmnsESqTjE3r1Lx4toO_wWCmeWf0-1V98f_fqmT3Jvfr_xUvs0946m1ZKnfkgyqUH0yLiZTwxPDTCt7UxBTpYfpiHVSwSPC8WYqqcrsS-0RVMIqXTZ_ajlHlQ_HounWbqeem8uxXpJdSPCwyCUhMrL8idG1VCW0ZRRAg9IFfOT21bwoQxvw7AwDuf9YvErw1BLGtSMDIdrA45ZDyH_nTCV1gPtqkA0lwZWUY_CSuQoX9AyTX6cFJikR7JvEr0kgtjorDi7LH2V8Taf-dt0Zqb8KEFySrCnzoBO3aKmF74FT85xGVzjS3m8KlKjDaZW_Fq3rg=w2494-h1288-no?authuser=0)

![overview2](https://lh3.googleusercontent.com/95TppJwEuZBY6mvukT4nrZ-YojkPYpLvHGE6EnWE4nR_WkhZcXFQpBxn8NlRF3-8M0Y97iCs3TKidFy5Em7qzZGk8TOK01IFsosyauKKX_fdWn05QRoFeXCL-3fgmnP4SME6La0uDXjWt9FABvKQBXqLYFXuSh5cYwf5bpy0haDN4y-ukCiBwAA1vpLfSjTIFhuBDkFJPlmTnJFYIyo2CCj-VjbY5Lg9hWQXIhy4SRBKSXxB4pHuhsawahCjJI1DiqUSTwKo0eolxANLdNvdC0mQ3YyaY7cC5nZysTrSKrHwdV_GC7l8KZ3XiH9JwLPxnIMHIW035Wrw_l8J9xUwUATex5oaRpLp6Q2_m3gzr5I-I5_ve7LT6zRfdVxtcx8Xm8RutO6E70C-3rS1ta1MDSussAwyn_8d4GsRvsoYpENKZyb5GU1hSVNK8cWH1l3JPBOCvLOMMpK7QlXe3rouR7z0bKIXA9rQKEr62Xxvtdj1rENGAuYc79T_yAw2X89z3IzIkoH_eHMA-czzH5-T0lnFW-_7F7s6N6CiHUNtKaa9DXvXCfiGpUo7AZ019fGvMKmOnczq2RxeK2Gf3RdKLOoaMzLzNv1wv7iZHOLldiWa5q3sO1AOGoU0ecfiDzjFqNkZ-A5ApF_UmtwTWIQ8siVkOUQUVvm8D2V6RDYUMXhcxOfFhNqTQ0FE20G5GAvoZupgVLlW_bwaqKSgSz4XwC7lkg=w2284-h1218-no?authuser=0)


## Setup python environemnt:

1. node and npm will need to be installed. And then run npm install:

    ```
    npm install
    ```

2. apply for a firebase project and fill the releted info into .env file:

    The project's backend is supported by firebase, please open a new firebase project for it. 
    Then fill the informations into following fields in env file.

    ```
    REACT_APP_FIREBASE_API_KEY=
    REACT_APP_FIREBASE_AUTH_DOMAIN=
    REACT_APP_FIREBASE_DATABASE_URL=
    REACT_APP_FIREBASE_PROJECT_ID=
    REACT_APP_FIREBASE_STORAGE_BUCKET=
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
    REACT_APP_FIREBASE_APP_ID=
    REACT_APP_FIREBASE_MEASUREMENT_ID=
    ```

3. change the file name of env to .env

4. Detail setting in firebase realtime database.
    There are 4 main fields in database: groupclt, member, records, users.
    ![firebase1](https://lh3.googleusercontent.com/pw/ACtC-3dc_cD7RtIicwy_gBUt75KUe7sqEGCxHm6Eh_EK3UnCKFAosvypxS2myehgdEC1dN1WiXJO9zene0yJl7bTlq8HOhABcsUCKRWQZh8yeub90YUXG_1jVaJ8s5-vKoGm6bBEtgjse8AKbSwktA_Na3NkAg=w2214-h1098-no?authuser=0)
    
    The only one field which needs to be set up by administrator is groupclt because user is able to sign up only if they have "group name" and "group secrete"
    ![firebase2](https://lh3.googleusercontent.com/8cihS46m5Ezl2xFCXLuIf6uNFlNN4QsEsu-tb-RDvoJtzxEUeuIiBIwFHi44fxsP3KhQwPQRR3L4cpY8q6RtP4iObfSTiEHgrWGh4WInz_DySxjY4207mpklZVY47LsN8gUyHzEzc_WZ5Be88j_V2AC6Xl2AZBic9cUmMHgK9fMMGcb76nhdfslpem5olgFGaQDVP8iqa_Z8LAU-dr0woPMFZXPQSrAYabRCDyjGM8AeRsCFhnTLrkYa70bl4WHHvmXDziMgc3EI8eTAvK0m18Rbaqb3yb3n-mLlUIqfSgJa7QSe0EHy_Huk5G5xjP15AXPeiiOq-R126edK8-eUy3kD8eHSqAOVSxuQ5dZiiSd9h4c8ZB-AuRCuRq8Z_gRdNLbGYkYkSFjTG6MKOwmpmFG5O3WPI3lwEHUsvRmum3sHzufbwW9e5RcB_SFJyHL6rWJ4rH9eAl9PObC1nUXm-GQmeSHzY_lm94EzQDztKcqXWS0Rroezoa1boLqwz_yc7wLpaCBFlwtQ-0Q383obS-BByTiKS_JEytTk7mW-98V8NZApLnnp-nkixypJWk3Rpje5ALGVzSuxP8QZyuybEg2IsgzEY3kIkjb7q-BCWXwgwNTNAKMIJNlXsBn2DZEqwyGSNGDk0P5Sy0izntqL2XVEzYKo5DrSikCvOOxa6So6CIQxt9aJRjHZus7ZFyn3HZ1TxYoA9if8rO7z-mIo2nMmZg=w1810-h1148-no?authuser=0)

    So create the group manually following the structure above

5. Set up zoom account info:
    - If you want to use Zoom feature, you will need to create a zoom account as a adminstrator acount. 
    - Apply for its api key and secrete key and fill it in .env file:
    ```
    REACT_APP_ZOOM_API_KEY=
    REACT_APP_ZOOM_API_SECRET=
    ```
    - Every time if user wants to have a zoom discussion, you will need to create a new meeting room by the admin account and provide the meeting id to user. 

    - User put the meeting id to join the meeting. Note that the user needs to be "leader" in groupctl field to use the zoom function.
    ![firebase3](https://lh3.googleusercontent.com/ObCrDqeaqCtFqA2Rws2y9kt45t0y6_a49uGogMsZeehCgjriTc5Igeur4SwZeGXBSHwifTEy84CtYDyIpfHvMu9GxdLQm33L8AlsuouGcFppRmLvQLJYkiHE0kODS3Et1MolOIBGpoO8QRxmESXSzfQeRLYFnqxb61xaZaoQXSHmM33od8p8k0SBG8NHyiHcMXthQ-xZQS6b-f273Jl058mLE-PpeRzjeNm8UiKH9BZAksisDSssDnCx0v9tx47AWK-hdgsnCoNbu8J-mKo8iJNmW36ZBuwUh8owU0Cs3aRkqQ1UqI9sZ4iQ92cOK_nnJfWjLHujmeIA3yoIom2j7zkXDeEu9WLMCClCBQ8jBQeRVmgSqlIvOt6pA055DVRC5Of5bPU2BKSDnaLyLInnbrY5gxhbzyh5M1Gc-jpARRGdFqXo5u1fzi51ihOZmOZDTAdZH7BvfxHcE-yNjiK1msd2Ay2CbKs3s9K-JMoHS2k4jPw9lcD1YncUdF2TCQ26OLfPB0mrMaO_DkkVVr5U3bn4EZuNNnkbIZY_y4Q9fEWuYzQb_Zb0aGmvJmNRZnTJzILq3Ld4jmQlmK7FvMBmY3D256iDFOCgK4XFFnW0Or_bO4S3tZHP1mLeUlYWsAJu1D4NJih0pWE5YKdYVXiek8_XVO1tm8qkUKG33DxvbTetAUkKlEWvbbY9ZDEJMJ7am9XTR4B8qJMzE83SA98tvsrpQQ=w2028-h1250-no?authuser=0)

6. Run test server
    ```
    npm run start
    ```