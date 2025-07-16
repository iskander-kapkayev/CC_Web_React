/* caption form for handling user inputs */

function CaptionForm() {
    return (

        <div className="form-container" id="captionform" style="display: none;">
            <h3>Can you make us laugh?</h3> 
            <form id="captionFormData">
            <input type="caption" id="caption" name="caption" placeholder="Type your caption here..." required> </input>
            <button type="submit" value="Submit">Add Cap</button>
            </form>
        </div>
        
    );
}

export default CaptionForm;