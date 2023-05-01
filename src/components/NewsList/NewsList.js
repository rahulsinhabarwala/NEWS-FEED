import NewsItem from "../NewsItem/NewsItem";

const NewsList = ({list})=>{
    return <div>
        {list?.map((item,index)=>{
            return <NewsItem details={item} key={index}/>
        })}
    </div>
}
export default NewsList;