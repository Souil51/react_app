 export class ListItemModel
{
     constructor(id, typeID, userName, userPulicId, message, date, upvote, downvote, currentUserUpvote, currentUserDownvote)
     {
         this.id = id;
         this.userName = userName;
         this.userPublicId = userPulicId;
         this.message = message;
         this.date = date;
         this.upvote = upvote;
         this.downvote = downvote;
         this.currentUserUpvote = currentUserUpvote;
         this.currentUserDownvote = currentUserDownvote;
         this.typeID = typeID;
     }

     GetDateToDisplay = function()
     {
         var hours = Math.abs(new Date() - this.date) / 3.6e6;

         if (hours < 24)
             return Math.floor(hours) + "h";
         else
             return Math.floor(hours/24) + "j";
     }
}