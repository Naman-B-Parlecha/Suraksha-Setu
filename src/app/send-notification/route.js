import admin from "firebase-admin";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = {
    type: "service_account",
    project_id: "codefury-9007d",
    private_key_id: "4130f35ccaa9d0b2d8508a976936578d23e261bf",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCt18MeGXPMcxTU\nw+YMh9NRON4MuLi2hE2QfatBISMc77hbWv/LcSxqgnBW3kbOGiFRlUFjk5JQTHK8\n+lOuQ5OHHAU6M6mfiQUHZhXgSIEN4Bz5w+hqyzc5f5c7ZgKrMVegVzcFdErl7nXR\nY6RMO+TsJg8eMjc2+Y8RQCPLNkBHe+3qnTDG8XOhAXkaat8KDKG8+qm8p6/3wX32\nHGUPH46nmFHMJiL3xydhdhB8KqBKACaEbKG0dQ11tBPqlbC+BpGRQfnugxLWhqfA\nqWiRpGfVkV7r6oBX+FqMeODAizkYxLShXWXtbqJ48+ZV1Am85Sm6v9soHLUSoXtr\nGqiGVELdAgMBAAECggEAMI7uH4A4ikky7mNx5NojurJJw//tCH5YNB4GMgERj8me\nE1aN0MPiBjY9LuaTnIpL+D/arffQjMFt4z+BFFIn6Tt4clNv8/IQB4sKXUWjVr7d\nGR8R0pLE8Dilg5/w6uSzd0QlSE69hRBgtIZCpFCulw/idSrNpXt77POfi+mxdsW+\nqlofng+nZXArE1PCfo9T6jrsuyPCpbYQnqRGSkomyeN+9B4exZU34mGn/tV0WFm/\nfsoVoVpBRh4KjzteTF83R+XOwPoCK2j4EOzXugRDw9p6IOPPg7bfO2ELbnov2Hqk\n5hb32tOWBBPh82s6NkvObHEroQ6Qav8DVF/cdhcUeQKBgQDp26J+RMZi6U7ngejH\n6V+RIblxoydkPjDPi5pu+MVQaQKyiD5hzYgt+rrdoMZ7Ld8HehnyWlJqqXJelYmq\nm0TXpsNXd+qOoDYWW3LjrpEqYIUBDy5m78ddL8/VxUFHiT+FG0vbhaHh6wedrnOM\nWPqBi1bNPj68SNoaISyGDxeTHwKBgQC+TXNwlUDVLy/j+K6JGMNnyrv9TtTD2+au\nZ/pay7J4XQnnxCfuT6QBbxmzVvAV0Ea2tWMYzZCZ5gaSjInVwMnJQWEIym+jRA89\nYMf6AlEN9tlS0sdWTVXzkb3XKWo+RSwAVGzqgn1yxwJSrS2QP4Aybq6OZlqxXJFl\nNofzyUbGgwKBgQCQ1ctsopGvvsl0jjuqXHoou5dLrv19kxrN36tU4VPq+i6GfeUM\n06tstqW3D5T9wyonSlL5i0ER+EHyHHE3rZRUb176NDWcAdOdwyODqaEUetTFFC7r\n58M0jqEMx28nq/QgLwirO7dH4TVFTj8YBB+Zzb+Du/JE0GXr2vHlUUGLhwKBgQCm\n02bbzzvip1coVp1K+jZzCrr6ON00RdZYFjbW2bM+6PECCGeo9pAj4a16FkCqHsee\n7CxPVgXppEkmt6UtibBbicDy3+Q2EDf76pfkh5tezoN9o+GzumAbAiyWLmxA4orM\nTzab7oDi2asjp0VGKyTLEVRc6UWgLjIXtFJCWLR+2QKBgAhML/mC1bNEw7iwjBc2\n7BuiNWk2X5Nl3nYO8jBSFkGpy8FFrLrcjkHyfIna5HItfltbyHvM4t9Qt7/XMAlz\n5SBhS7DSO+G2HRkjXqijSW6M7PtjYoOwO/mXOxinvrBO+0d+INQEq0h7Dw5hJDLV\nIOUkLQKytJT2Fu9uVn3zRz4G\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-bb4jo@codefury-9007d.iam.gserviceaccount.com",
    client_id: "108268079322021625751",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bb4jo%40codefury-9007d.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(request) {
  const { token, title, message, link } = await request.json();

  const payload = {
    token,
    notification: {
      title: title,
      body: message,
    },
    webpush: link && {
      fcmOptions: {
        link,
      },
    },
  };

  try {
    await admin.messaging().send(payload);

    return NextResponse.json({ success: true, message: "Notification sent!" });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
