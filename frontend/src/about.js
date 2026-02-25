// about.js
import React from "react";
import { Link } from "react-router-dom";

export function AboutPage() {
    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #6a5cff, #8360c3)",
            fontFamily: "Arial, sans-serif",
            color: "#333"
        }}>
            {/* Top navbar */}
            <nav style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem 2rem",
                backgroundColor: "#4e3fcc",
                color: "white",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
            }}>
                <Link to="/" style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontSize: "1rem"
                }}>Home</Link>
            </nav>


            <div style={{
                maxWidth: "800px",
                margin: "3rem auto",
                padding: "2rem",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
            }}>
                <h1 style={{ marginBottom: "1rem", color: "#333" }}>About Vidi Maze</h1>
                <p style={{ lineHeight: "1.6", marginBottom: "1rem" }}>
                    Welcome to the <strong>Vidi Maze</strong>. This was made to help you find new 
                    media without the overhead <br/> of an algorithm.
                </p>
                <p style={{ lineHeight: "1.6" }}>
                    Check out the source code 
                    <a href="https://github.com/JS-projects117/YT-Maze"> here</a>
                     <br/>
                     <br/>
                     and see other projects
                     <a href="https://mintricacy.com/"> here</a>
                </p>
                 
            </div>
        </div>
    );
}