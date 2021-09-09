import { PAGINATION_QUERY } from "../components/Pagination";

export default function paginationField() {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      //read number od items on page from cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      const items = existing.slice(skip, skip + first).filter((x)=>x); // filter undefined;
      //if there are items and there arent enough items to satisfy how many we requested and we are on last page
      //then just send it
      if(items.length && items.length !==first && page === pages) {
        return items;
      }
      if(items.length !==first){
          //dont have any items , go to network to fetch them
          return false;
      }
      //if their are items return from cache
      if(items.length){
          return items;
      }

      return false; //fallback to network
      //ask read function for items
      //return items from cache
      //return false (network request)
    },
    merge(existing,incoming,{args}) {
        const {skip,first} = args;
      //runs when apollo client comes back from network with data
      const merged = existing?existing.slice(0):[];
      for(let i=skip;i<skip+incoming.length;i++) {
          merged[i] = incoming[i-skip];
      }

      return merged;
    },
  };
}
