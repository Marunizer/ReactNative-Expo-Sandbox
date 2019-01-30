const limit = 8

const FeedService = {

    fetchData: async function() {

        const URL = 'http://staging.api.helloyada.com/feeds/general?limit='+limit;

        let result = await fetch(URL).then(response => response.json());

        console.log('first feed query handled');

        return result.list;
    },

    //if I want to be more specific with what Iw ant from the JSON?
    fetchMoreData: async function(lastId:string ) {

        const URL = 'http://staging.api.helloyada.com/feeds/general?limit='+limit+'&lastId='+lastId;
        
        let result = await fetch(URL).then(response => response.json());

        console.log('update handled');

        return result.list;
    }
};


export default FeedService;