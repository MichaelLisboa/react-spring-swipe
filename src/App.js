import React, { useState, useEffect } from "react";
import HyperSwiper from "./components/HyperSwiper";
import useIsIOS from "./hooks/useIsIOS"
import {InstallPWA} from "./components/InstallPWA"
import { data } from "./Data";

async function fetchLocalImages(r) {
    const localImages = r.keys().map(r).map(i => i.default);
    const remoteImages = data.map(i => i.image.url);
    const allImages = [...localImages, ...remoteImages]
    const res = await allImages
    return res;
}

const App = () => {
    const { isIPhone, isIPad, isIOS, isSafari, prompt } = useIsIOS();
    const [images, setImages] = useState([])

    useEffect(
        () => {
            fetchLocalImages(
                require.context("./images", false, /\.(png)$/)
            )
            .then(result => {
                setImages(result)
            });
        }, []
    )

  return (
    <div className="App">
        <HyperSwiper data={data} />
        <div
            style={{
                position: "absolute",
                top: "-5000px",
                zIndex: "-10",
                height: "1px",
                width: "1px",
                overflow: "hidden"
            }}>
            {images.map((img, i) =>
                <img key={`img-${i}`} src={img} alt="" />
            )}
            {prompt && <InstallPWA />}
        </div>
    </div>
  );
}

export default App;
