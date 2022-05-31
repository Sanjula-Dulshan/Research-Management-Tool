import "./CSS/topicsub.css";
import "./CSS/btrap.css";
import React, {useState,useEffect} from "react";
import axios from 'axios';
import { useHistory } from 'react-router';
import emailjs from "emailjs-com";
import { Store } from 'react-notifications-component';

export default function EvaluateTopic()  {
    const [tid, settid] = useState();
    const [id, setid] = useState();
    const [groupID, setgroupID] = useState("Y3_S1_1234");
    const [groupName, setgroupName] = useState();
    const [rField, setrField] = useState();
    const [rTopic, setrTopic] = useState();
    const [leaderEmail, setleaderEmail] = useState();
    const [comment, setacomment] = useState();
    const [Evaluation, setEvaluation] = useState();
    const[request,setRequest] = useState([]);

    let history = useHistory();

    useEffect(()=>{

        const path = "http://localhost:8070/topic/group/"+groupID;
        console.log(path);

        axios.get(path).then((res)=>{
            setRequest(res.data.topicRouter);
            }).catch((err)=>{
                alert(err.message);
        });

        console.log(request.groupName);


        settid(request.tid);
        setid(request._id);
        setgroupID(request.groupID);
        setgroupName(request.groupName);
        setrField(request.rField);
        setrTopic(request.rTopic);
        setleaderEmail(request.leaderEmail);
        setacomment(request.comment);

    },[])

    function submitData(e) {
        e.preventDefault();
        settid("1111");
        const newTopic = {
              
            tid,
            groupID,
            groupName,
            rField,
            rTopic,
            leaderEmail,
            comment,
            Evaluation,
        }

        axios.post("http://localhost:8070/evaluatedTopic/",newTopic).then(()=>{

            Store.addNotification({
                title: "Evaluation Sent Successfully.",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                type: "success",
                insert: "top",
                container: "top-right",
                
                dismiss: {
                  duration: 1500,
                  onScreen: true,
                  showIcon: true
                },
    
                width:400
            });
            e.target.reset();
            history.push('/StdTopicList');
            
    
         }).catch((err)=>{
    
            alert(err);
         })
    

    }

    return(
        <div className="topic-container">
            <div style={{backgroundColor:"#0F0934"}}>

                <div>
                    <img className="img-side" src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1653068950/logo11_ggebb3.png"></img>
                </div>

                <div className="s-from-container">
                    <form > 
                        <div className="mb-3">
                            <label className="s-form-label" >Group ID</label>
                            <input className="s-input" disabled type="text"  style={{width:"450px"}}  id="cUName"
                                value={request.groupID}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="s-form-label">Group Name</label>
                            <input  className="s-input" disabled  type="text"  style={{width:"450px"}}  id="cName"
                                value={request.groupName}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="s-form-label">Research Field</label>
                            
                            <input  className="s-input" disabled  type="text"  style={{width:"450px"}}  id="cName"
                                value={request.rField}
                                />

                        </div>

                        <div className="mb-3">
                            <label className="s-form-label">Research Topic</label>
                            <input className="s-input" disabled type="text"  style={{width:"450px"}}  id="cName"   
                                value={request.rTopic}
                            />
                           
                        </div>

                        <div className="mb-3">
                            <label className="s-form-label">Group Leader's email</label>
                            <input className="s-input" disabled type="text"  style={{width:"450px"}}  id="cName"
                                value={request.leaderEmail}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="s-form-label">Comments (Optional)</label>
                            <input className="s-input" disabled type="text"  style={{width:"450px", height:"100px"}}  id="cName"
                                value={request.comment}
                            />
                        </div>
                    </form>       
                </div> 

                

            </div>



            <div style={{backgroundColor:"white"}}>

            <div className="t-list-head-container">
                    <label className="h-text" > EVALUATE</label> <br  />
                    <label className="h-text"> <label style={{color:"#FF5631"}}> RESEARCH</label> PROJECT</label> <br />
                    <label className="h-text">TOPIC</label>
            </div>
            
            <div className="t-from-container" style={{marginLeft:'20%'}}>


                <button className="btn btn-success" style={{backgroundColor:"#00D8BE",fontSize:"2rem",marginLeft:"10%" }}>
                    Download Topic Details
                </button> <br/> <br/>


                <form onSubmit={submitData} >
                        
                        <div className="mb-3">
                            <label className="t-form-label">Comments</label>
                            <input type="text"  style={{width:"450px", height:"100px"}}  id="cName"
                                required
                                onChange={(e)=>setEvaluation(e.target.value)}
                            />
                        </div>



                        <button type="submit" className="btn btn-primary" style={{backgroundColor:"#0F0934",width:"200px",fontWeight:"bold",marginLeft:"45%"}} >Submit</button>
                    </form>

                    <div className="bottom-t-container">
                        <label className="bottom-t" style={{color:"#FF5631"}}> SLIIT</label> <label className="bottom-t"> Research</label> <br />
                        <label className="bottom-t"> Management Tool</label>
                    </div>
            
                </div>

            </div>
        </div>
    );
        


}