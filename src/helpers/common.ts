export const getBgImageFromBinary = (coverImg: { data: any; contentType: string }) => {
    function toBase64(arr: any) {
        //arr = new Uint8Array(arr) if it's an ArrayBuffer
        return window.btoa(
            arr.reduce((data: any, byte: any) => data + String.fromCharCode(byte), "")
        );
    }

    let image = "";
    if (coverImg.data && coverImg.data.data) {
        image = `url(data:image/png;base64,${toBase64(coverImg.data.data)})`;
    }

    return image;
};