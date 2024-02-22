import { db, storage } from "@/utils/db";

import React, { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { styles } from "@/styles";
import { doc, updateDoc } from "firebase/firestore";
import { LoadingSpinner } from "../base/LoadingSpinner";

export const AvatarUploader = (props: { userId: string }) => {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.item(0);

    if (!file) return;

    const imageSize = await validateImageSize(file);

    if (!imageSize) {
      window.alert("Too large. Please upload an image under 900x900.");
      return;
    }

    setIsLoading(true);
    const storageRef = ref(storage, `avatars/${props.userId}.png`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume.
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      async () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // Update the user's avatar with this url.
          await updateDoc(doc(db, "users", props.userId), {
            picture: downloadURL,
          });
          setIsLoading(false);
          // Hit the back-end to update the user's avatar in all of their agents.
          // TODO.
        });
      }
    );
  };

  const validateImageSize = (file: File): Promise<boolean> =>
    new Promise((resolve) => {
      const image = new Image();

      image.onload = () => {
        const isValidSize = image.width <= 900 && image.height <= 900;
        resolve(isValidSize);
      };

      const URL = window.URL || window.webkitURL;
      image.src = URL.createObjectURL(file);
    });

  return (
    <span>
      {!isLoading ? (
        <input
          type="file"
          accept="image/*"
          title="poop"
          onChange={handleFileChange}
          ref={inputFile}
          style={{
            color: "transparent",
            width: "fit-content",
          }}
        />
      ) : (
        <LoadingSpinner />
      )}
    </span>
  );
};
