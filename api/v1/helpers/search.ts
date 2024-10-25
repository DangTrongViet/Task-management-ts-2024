interface objSearch {
    keyword: string,
    regex?: RegExp
}

const searchHelper =(query: Record<string,any>): objSearch=>{
    let objSearch: objSearch={
        keyword: ""
    }

    if(query.keyword){
        objSearch.keyword=query.keyword;
        const regex=new RegExp(query.keyword,"i");
        objSearch.regex=regex;
    }
    return objSearch;

}

export default searchHelper;