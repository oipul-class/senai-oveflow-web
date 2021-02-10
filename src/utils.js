const validSquaredImage = (image) => {

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(image);

        reader.onLoad = (event) => {
            const image = new Image();

            image.src = event.target.result;

            image.onload = () => {
                const width = image.width;
                const height = image.height;

                if (width/height > 1.1) {
                    reject("A imagem não é quadrada");
                    return;
                }
                    
                return resolve("");
            }
        }
    })
}

export default validSquaredImage;
