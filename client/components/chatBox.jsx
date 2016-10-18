import React from 'react';

const ChatBox = ({body}) => {
  // render for you!
  return (
    <div className="row chatbox-container base_sent">
      <div className="col-md-10 col-xs-10" id="sent-msg">
        <div className="messages msg-sent">
          <p>{body}</p>
        </div>
      </div>
    </div>
  );
  // The render for the other chatter
  // return (
  //   <div className="row chatbox-container base_sent">
  //     <div className="col-md-10 col-xs-10" id="sent-msg">
  //       <div className="messages msg-sent">
  //         <p>{body}</p>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default ChatBox;