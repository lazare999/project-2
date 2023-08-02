import React from "react";

function Test(props) {
console.log(props.selectedItem)

    return <><h1>{props.selectedItem}</h1>
    <p>hello</p></>
}

export default Test;