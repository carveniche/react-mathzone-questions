import { Alert } from "@mui/material";
import React from "react";
import styled from "styled-components";
export default function CustomAlertBoxMathZone({ msg }) {
  return (
    <AlertBox>
      <Alert severity="error" color="warning"  style={{ width: "100%", textAlign: "center" }} >
        <h4 className="h4" >{msg ? msg : "Please answer the question..."}</h4>
      </Alert>
    </AlertBox>
  );
}

const AlertBox = styled.div`
  margin-bottom: 0.7rem;
  svg {
    display: none !important;
  }
 h4{
 color:#cd4543;
 }
`;
