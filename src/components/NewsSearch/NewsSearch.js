import {useState} from 'react'
import { SEARCH_BUTTON_TEXT } from '../../constants';
import Button from '../Button/Button';
import Input from "../Input/Input";

const NewsSearch = ({handleSeach})=>{
    const [inputValue,setInputValue] = useState('');
    const handleClick = ()=>{
        setInputValue('')
        handleSeach(inputValue)
    }
    return <div>
        <Input value={inputValue} onChange={setInputValue}/>
        <Button value={SEARCH_BUTTON_TEXT} onClick={handleClick}/>
    </div>
}

export default NewsSearch;