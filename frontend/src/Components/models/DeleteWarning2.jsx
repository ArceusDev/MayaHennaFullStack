import PropTypes from 'prop-types';

export default function DeleteWarning2(props){

    function deleteWarning(){
        props.setDeleteFormState(false)
    }

    function deleteFun(id){
        console.log(id);


        fetch(`http://localhost:5036/api/Product/${id}`,{
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('Bearer')}`
            }
        })
            .then(res => {
                // res.json()
                console.log(res)
                props.setDeleteFormState(false)
                props.setReafreshTable(prev => prev)
            
            })


    }


    return(
        <>
        <div className='warning-container'>
            <h3>This post will be deleted</h3>
            <button onClick={() => deleteFun(props.deleteId)}>oK</button>
            <button onClick={deleteWarning}>cancel</button>

        </div>
        
        </>
    )
}

DeleteWarning2.propTypes = {
    setDeleteFormState: PropTypes.func,
    setReafreshTable: PropTypes.func,
    deleteId: PropTypes.number,
};