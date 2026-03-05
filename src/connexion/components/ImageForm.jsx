

const ImageForm = ({image, title, width, height, className}) => {
    return (
        <img src={image} alt={title} width={width} height={height} className={className} />
    )
}

export default ImageForm;