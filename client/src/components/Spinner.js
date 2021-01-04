import React from 'react'
import { Spinner } from 'reactstrap'

export default props =>
<div style={{ height: '80vh' }}>
                    <div style={{

                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                    }}>
                        <Spinner style={{ width: '3rem', height: '3rem', color: "#fb8c00" }} />
                    </div>
</div>