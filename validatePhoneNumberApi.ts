import {Contact} from "./types.ts";
import {GraphQLError} from "graphql";
import {load} from "https://deno.land/std@0.202.0/dotenv/mod.ts";
const env = await load();
const API_KEY = env["API_KEY"]


export type telNumberType = {
    isValid:boolean,
    country:string,
    timeZone:string
}

export const validatePhoneNumberApi = async (telNumber:string)
    : Promise<telNumberType> => {
    try {
        const BASE_URL= "https://api.api-ninjas.com/v1/validatephone";
        const response = await fetch(`${BASE_URL}?number=${telNumber}`,
            {headers: {'X-Api-Key': API_KEY}})
        if(response.status!==200){
            console.log("Error, can't fetch that");
            return ;
        }
        const data = await response.json();
        return {
            isValid:data.is_valid,
            country:data.country,
            timeZone:data.timezones[1]
        };
    }catch (e){
        throw new Error(e);
    }
}