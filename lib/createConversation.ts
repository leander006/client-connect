
interface inputType{
      prisma:any,
      userId1:number
      userId2:number,
      name:string
}

export const  create = async({prisma,name,userId1,userId2}:inputType) =>{
      const newConversation = await prisma.conversation.create({
            data: {
              name:name
            }
          });
          await prisma.userConversationRelation.createMany({
            data: [
              {
                userId: userId1,
                conversationId: newConversation.id
              },
              {
                userId:userId2,
                conversationId: newConversation.id
              }
            ]
          });
       return newConversation   
}