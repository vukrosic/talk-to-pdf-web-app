// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { updateKnowledgeTree } from "../store/actions";
// import { db } from "../config/firebase";

// const EditableKnowledgeTree = () => {
//   const dispatch = useDispatch();
//   const knowledgeTree = useSelector((state) => state.knowledgeTree.knowledgeTree);
//   const [editableData, setEditableData] = useState([]);

//   useEffect(() => {
//     // Populate the form fields with the existing data from the Firebase database
//     setEditableData(knowledgeTree);
//   }, [knowledgeTree]);

//   const handleFieldChange = (event, index) => {
//     const { name, value } = event.target;
//     const updatedData = [...editableData];
//     updatedData[index][name] = value;
//     setEditableData(updatedData);
//   };

//   const handleSubmit = async () => {
//     try {
//       // Update the Firebase database with the new data
//       await db.collection("knowledgeTree").doc("treeId").update({
//         knowledgeTree: editableData
//       });

//       // Dispatch the updated data to Redux store
//       dispatch(updateKnowledgeTree(editableData));

//       console.log("Data updated successfully!");
//     } catch (error) {
//       console.error("Error updating data:", error);
//     }
//   };

//   return (
//     <div>
//       {editableData.map((item, index) => (
//         <div key={item.id}>
//           <h3>{item.id}</h3>
//           <label>
//             Messages (System):
//             <input
//               type="text"
//               name="messages.system"
//               value={item.messages.system}
//               onChange={(event) => handleFieldChange(event, index)}
//             />
//           </label>
//           <label>
//             Messages (User):
//             <input
//               type="text"
//               name="messages.user"
//               value={item.messages.user}
//               onChange={(event) => handleFieldChange(event, index)}
//             />
//           </label>
//           {/* Add more form fields for other editable properties */}
//         </div>
//       ))}
//       <button onClick={handleSubmit}>Save Changes</button>
//     </div>
//   );
// };

// export default EditableKnowledgeTree;
