import React from 'react'


function NotFound() {
    return (
        <div className="container" 
            style={{
                position: "absolute",
                left: "10%",
                top: "20%",
                transform: "translate(-50 %, -50 %)",
                padding: "10px"
            }}
        >
            <h1 style={{
                fontSize: "20vh"
            }}>404</h1>
            <h3>page not found</h3>
            <p>We are sorry but the page you are looking for does not exist.</p>

        </div>
    )
}

export default NotFound
