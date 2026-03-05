const TexteAccueil = (props) =>
{

    return (
        <>
            <h1 style={{
                fontWeight: 'bold',
                color: 'blue'
            }}>{props.title}</h1>
            <p style={{
                fontSize: '15px',
                color: 'blue',
                fontWeight: 'bold',
            }}>{props.description}</p>
            <p style={{
                fontSize: '15px',
                color: 'black',
                fontWeight: 'bold',
            }}><strong style={{color: 'red'}}>information  </strong> : {props.info}</p>
            <p style={{
                fontSize: '15px',
                color: 'black',
                fontWeight: 'bold',
            }}> <strong style={{color: 'red'}}>contact  </strong> : {props.contacts}</p>
        </>
    )
}

export default TexteAccueil;