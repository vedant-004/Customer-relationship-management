import Campaign from "../../models/Campaign";


export async function createCampaignService( 
    userId: string,
    name: string,
    ruleId: string,
    customerIds: string[],
    message: string,
    intent?: string
) {
try{
    const newCampaign = await Campaign.create({
        userId,
        name,
        ruleId,
        customerIds,
        message,
        intent,
    });

    return newCampaign;
}
catch (error) {
    console.error("Error creating campaign:", error);
    return null;
}

}

export async function getAllCampaignsService(userId:string){
    try{
        const campaigns = await Campaign.find({userId});
        if(!campaigns || campaigns.length===0){
            return null;
        }
        return campaigns;
    }

    catch(error){
        console.error("Error fetching Campaigns:", error);
        throw new Error("Error fetching Campaigns");
    }
}