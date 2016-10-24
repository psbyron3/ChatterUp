import React from 'react';
import moment from 'moment';

let socketId;

socket.on('join user', issued => {
  socketId = issued;
  console.log('socketId is :', socketId)
});

const ChatBox = ({body}) => {
  // render for you!
  //if (body.userId === socketId) {
    return (
      <div className="chatbox-container base_sent">
        <div id="sent-msg">
          <div className="messages msg-sent">
            <p>{body.content}</p>
            <time className='msg-timestamp'> 
              {moment(body.createdAt).fromNow()} 
            </time>
          </div>
        </div>
      </div>
    );
  // } else {
  //   //The render for the other chatter(s)
  //   return (
  //     <div className="chatbox-container base_sent">
  //       <div className="col-md-10 col-xs-10" id="received-msg">
  //         <div className="messages msg-sent">
  //           <p>{body.content}</p>
  //           <time className='msg-timestamp'>
  //             {moment(body.createdAt).fromNow()}
  //           </time>
  //         </div>
  //       </div>
  //     </div>
  //   );  
  // }
  
};

export default ChatBox;