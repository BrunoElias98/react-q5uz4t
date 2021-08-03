// components/user/Card.js
import React from "react";
import { Container } from "./Container";

export const Card = ({ background, padding = 20, children }) => {
	return (
		<Container background={background} padding={padding}>
			{children}
		</Container>
	)
}
