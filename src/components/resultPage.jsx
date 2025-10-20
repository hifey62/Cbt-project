import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/authcontext'
import { useNavigate } from 'react-router-dom'

const ResultPage = () => {
    const {result} = useContext(AuthContext);
    const navigate = useNavigate();
if (!result) {
    return (
        <div
            style={{
                maxWidth: 900,
                margin: "36px auto",
                padding: 24,
                fontFamily:
                    "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                color: "#0f172a",
                textAlign: "center",
            }}
        >
            <div style={{ fontSize: 16, color: "#64748b" }}>Loading result…</div>
        </div>
    );
}

const percent = Math.round((result.score / Math.max(result.total, 1)) * 100);
const grade =
    percent >= 90 ? "Excellent" : percent >= 75 ? "Good" : percent >= 50 ? "Fair" : "Needs improvement";

return (
    <div
        style={{
            fontFamily:
                "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
            color: "#0f172a",
            background: "#f8fafc",
            minHeight: "100vh",
            padding: 24,
            boxSizing: "border-box",
        }}
    >
        <main
            style={{
                maxWidth: 980,
                margin: "28px auto",
                padding: 28,
                background: "#ffffff",
                borderRadius: 14,
                boxShadow: "0 8px 28px rgba(15, 23, 42, 0.06)",
                display: "grid",
                gridTemplateColumns: "1fr 220px",
                gap: 20,
                alignItems: "start",
            }}
        >
            <section>
                <header style={{ marginBottom: 18 }}>
                    <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
                        Nice try, {result.userName} — here’s your result summary
                    </h1>
                    <p style={{ margin: "8px 0 0", color: "#64748b", fontSize: 14 }}>
                        Review the overview below. You can retake the test to improve your score.
                    </p>
                </header>

                <div
                    style={{
                        background: "#f1f5f9",
                        padding: 16,
                        borderRadius: 10,
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <div style={{ fontSize: 13, color: "#475569", marginBottom: 6 }}>Score</div>
                            <div style={{ fontSize: 20, fontWeight: 700 }}>{result.score} / {result.total}</div>
                        </div>

                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 13, color: "#475569" }}>Performance</div>
                            <div style={{ fontSize: 16, fontWeight: 700 }}>{percent}%</div>
                            <div style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>{grade}</div>
                        </div>
                    </div>

                    <div style={{ marginTop: 6 }}>
                        <div
                            aria-hidden
                            style={{
                                height: 12,
                                background: "#e6eefb",
                                borderRadius: 999,
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    width: `${Math.min(Math.max(percent, 0), 100)}%`,
                                    height: "100%",
                                    background: "linear-gradient(90deg,#6366f1,#06b6d4)",
                                    boxShadow: "0 2px 6px rgba(3,7,18,0.08) inset",
                                    transition: "width 600ms ease",
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
                        <div
                            style={{
                                padding: "8px 12px",
                                background: "#ffffff",
                                borderRadius: 8,
                                boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
                                fontSize: 13,
                                color: "#0f172a",
                            }}
                        >
                            Total questions: {result.total}
                        </div>
                        <div
                            style={{
                                padding: "8px 12px",
                                background: "#ffffff",
                                borderRadius: 8,
                                boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
                                fontSize: 13,
                                color: "#0f172a",
                            }}
                        >
                            Score: {result.score}
                        </div>
                    </div>
                </div>
            </section>

            <aside
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        width: 140,
                        height: 140,
                        borderRadius: 999,
                        background: "linear-gradient(135deg,#6366f1,#06b6d4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        boxShadow: "0 10px 30px rgba(3,7,18,0.12)",
                    }}
                >
                    <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 36, fontWeight: 800, lineHeight: 1 }}>{result.score}</div>
                        <div style={{ fontSize: 13, opacity: 0.95 }}>of {result.total}</div>
                    </div>
                </div>

                <div style={{ textAlign: "center" }}>
                    <button
                        style={{
                            width: "100%",
                            padding: "10px 12px",
                            background: "#0f172a",
                            color: "#fff",
                            borderRadius: 8,
                            border: "none",
                            cursor: "pointer",
                            fontWeight: 600,
                        }}
                        onClick={() => navigate("/profile")}
                    >
                        Retake Test
                    </button>
                    <div style={{ marginTop: 8, fontSize: 12, color: "#64748b" }}>Or review answers</div>
                </div>
            </aside>
        </main>
    </div>
)
}

export default ResultPage