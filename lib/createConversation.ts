
interface inputType{
      prisma:any,
      userId1:number
      userId2:number,
}

export const  create = async({prisma,userId1,userId2}:inputType) =>{
      const newConversation = await prisma.conversation.create({});
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