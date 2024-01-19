import {load} from "https://deno.land/std@0.202.0/dotenv/mod.ts";
const env = await load();
const API_KEY = env["API_KEY"]

export const worldTimeAPI = async (timezone:string)
    : Promise<String> => {
    try {
        const BASE_URL= "https://api.api-ninjas.com/v1/worldtime";
        const response = await fetch(`${BASE_URL}?timezone=${timezone}`,
            {headers: {'X-Api-Key': API_KEY}})
        if(response.status!==200){
            console.log("Error, can't fetch that");
            return ;
        }
        const data = await response.json();
        return data.datetime;
    }catch (e){
        throw new Error(e);
    }
}