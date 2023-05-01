const NewsItem = ({details})=>{
    return <div>
        <img src={details?.fields?.thumbnail}></img>
        <div>{details?.fields?.headline}</div>
    </div>
}

export default NewsItem;