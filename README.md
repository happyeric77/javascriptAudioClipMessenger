# Audio Clip Messenger 

This utility project is to allow users/teams to communicate with each other with short audio clip, which will be able to make teamwork more efficient.


![overview1](https://lh3.googleusercontent.com/MMU7DZcAmcZHUM4rq3SiKq7xzHSVQV7IhaKXfldMF-Ffe6WKB7dUu8SoejoifuvX5wV4HQr-BUx16zOtgDtUz0p1uTP56DEbNDc-ETpkHqNCRfSwZ7y2LCb6z2Da1aVAzyaxQXh446XG5gQ2Kc9G_ELR-ElGNCCiwu3m2rCrBUgTQPdvajvd-4IGsJnOPDuXvguMyDCk7QFuDW6Am1w2oJi6Zn8iM-p5kBCU4OK9iJG8BA7umXOBAauoV7MkfJ-nCUMKvipB2I2-EkD3F1x7YaUg-G5eINaBwn9sMuXood6vPiq_UuEc-VdqT2n8h4HKdgCoFW4fhaJ0k0AJsppmdp9jno65EmwmoMC32ogpppIkslsYWRvvBdTRQFsqCO-VLCJ_s6Fp5DsSx3M_jagfOHP_vHOsPu8oESqFjxGIeRS4utTtTKLUFZM_iUA2LzE38Q9FaoTAuS_uonldtGPlc2qHMnIkURRlzkpGlXStt3xiRsaL5F7OpvnG2Lf4TYc89n0QY19yZ5EawjV2Y2Lhm0FeOHQnSVisuKbQeXHpOcOQFg2GFe7NIqzbEf1VPRYOeSKqYO_e3G2a6cuux-V4gjXrcSJwP6-vL3a4uQ89YQ5VwvwMTBkM1U5jHr7quMuyaFnylHaaRAZc-5w3SqbCgj8c2euSOni2r4oCj3isHQJL4EkOVca0kHQ0mSJfXkaYImcSaQxhqIXSnoeM4U_EV4C7MA=w2284-h1218-no?authuser=0)

![overview2](https://lh3.googleusercontent.com/unQylozdeRFLvyCggq7S3ErRaCQSj9NGUCz0MEBr0QHv0zF3ZMVN_GZGeHr88SbSmsjtcMimLrqLBynu5ZvN5lipDxWjg3fEwGFHPfr-kI5U0ve0iHvrGNfqYIeoT-l0jP3y8oKjyfQowsyyEY0SYRzQ5A_mtTf8Su_WAEoqhCJzrJrcOYndI3_E9GCrS8O8q_uytbulraVguIlS2A0lF94pEnr-cY0n9-zhwHLXbuaVSuoHVv4SuT6_S71KMajwKz3dnWQcTsZ0B2V019PxPdITtOcLqYQCU233-inzQbF8ilQJtgXUIma8h7leoRoTCkdLoQCd5XAHjDBRIaINuFqiWK4RXo2VqJHkJ5iZ3xnk-iB4ROAho9vVtCV5TuGLcC7Jxk3td4JpHXwFJkoPR0c9xHRPiHpa2M7z82N01zeuh2fWoqQswaTeGKuw0JSlvt5ZVMuTQRaT6AoDYicyxXmcYkdeVAqdnAB4JaShr3PonGng-wm8kwDN49skzJSeSSQxURMv83xFFqV0KmDoDt-_ZCXJ59dhe41W7OPrHULKKqcTWJzMSXdDCR5rcK80X9T25j3g1KuURk_nPsD1kfUv0gedNxfUplGK3NgX3ZMRetRCAVT4YX9OFFZahyLmm8Uo0WaLE-S9Hd70pi25MHRinDKzdWQe4b8PdEl1mOgU4oyeHm52vFfbewKyW5I_f1MwzZpvuSE7lFA9xz-vAjWYCw=w2494-h1288-no?authuser=0)


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