import admin from "firebase-admin";
import { serviceKey } from "../../../service_key.js";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = serviceKey;
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
