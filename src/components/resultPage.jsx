import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/authcontext'

const ResultPage = () => {
    const {result} = useContext(AuthContext);
  return (
    <div>
         <div>ResultPage</div>
    
        <main
            style={{
                maxWidth: 900,
                margin: "36px auto",
                padding: 24,
                fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                background: "#f3f6fb",
                borderRadius: 12,
                color: "#0f172a",
                boxSizing: "border-box"
            }}
        >
            <header
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 20,
                    marginBottom: 20
                }}
            >
                <div>
                    <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Nice Try {result.userName} here is your Result summary</h1>
                    <p style={{ margin: "6px 0 0", color: "#475569" }}>Here’s how you did — review details and try again if you want a better score.</p>
                </div>

                <div
                    style={{
                        width: 110,
                        height: 110,
                        borderRadius: 999,
                        background: "linear-gradient(135deg,#6366f1,#06b6d4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        boxShadow: "0 6px 18px rgba(10, 25, 47, .12)"
                    }}
                >
                    <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{result.score}</div>
                        <div style={{ fontSize: 12, opacity: 0.9 }}>of {result.total}</div>
                    </div>
                </div>
            </header>

          
        </main>
    </div>
   
    
  )
}

export default ResultPage