// components/user/Container.js
import React from "react";
import { Container as ContainerMaterial } from "@material-ui/core";
import { useNode } from "@craftjs/core";

export const Container = ({ background, padding = 0, maxWidth, children }) => {
	const { connectors: { connect, drag } } = useNode();
	return (
		<ContainerMaterial ref={ref => connect(drag(ref))} style={{ background, padding: `${padding}px`, maxWidth: `${maxWidth}px` }}>
			{children}
		</ContainerMaterial>
	)
}