import {GraphQLError} from "graphql";
import ContactModel, {ContactModelType} from "../db/contact.ts";
import {Contact} from "../types.ts";
import {telNumberType, validatePhoneNumberApi} from "../validatePhoneNumberApi.ts";
import {worldTimeAPI} from "../worldTimeAPI.ts";

export const Mutation = {
    addContact: async (_:unknown, args:{name:string,telNumber:String}
    ): Promise<ContactModelType> => {
        const name: string= args.name;
        const telNumber:string= args.telNumber;
        const telParams:telNumberType= await validatePhoneNumberApi(telNumber);
        if(telParams.isValid===false){
            throw new GraphQLError("Error, phoneNumber is not valid");
        }
        const time = "XXX"
        /*
        const time= await worldTimeAPI(telParams.timeZone);

        if(!localTime){
            throw new GraphQLError("Error fetching localTime")
        }

         */

        const contact = {
            name: name,
            telNumber: telNumber,
            country: telParams.country,
            localTime: time
        }
        const newContact = await ContactModel.create(contact);
        return newContact;
    },
   updateContact: async (_:unknown, args:{id:string,name:string,telNumber:string}
    ): Promise<ContactModelType> => {
        if(args.telNumber){
            const teleNumber= await validatePhoneNumberApi(args.telNumber);
            if(teleNumber.isValid===false){
                throw new GraphQLError(`Error, phoneNumber ${args.telNumber} is not valid`);
            }
            const localTime= "XXX";
            const contact = await ContactModel.findByIdAndUpdate(args.id,
                {name: args.name,
                    telNumber:args.telNumber,
                    country:teleNumber.country,
                    localTime:localTime}).exec();
            const newContact= {id:args.id,name: args.name,
                telNumber:args.telNumber,
                country:teleNumber.country,
                localTime:localTime}
            return newContact;
        }
       const contact = await ContactModel.findByIdAndUpdate(args.id, {name: args.name,}).exec();
       const newContact= {
           id:args.id,
           name: args.name,
           telNumber:contact.telNumber,
           country:contact.country,
           localTime:contact.localTime}
       return newContact;
    },

    deleteContact: async (_:unknown, args:{id:string}
    ): Promise<Boolean> => {
        const contact = await ContactModel.findByIdAndDelete(args.id).exec();
        if(!contact){
            return false;
        }
        return true;
    },
}