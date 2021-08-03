import React, { useState, useEffect } from "react";
import ContentEditable from 'react-contenteditable'
import sanitizeHtml from "sanitize-html";
import { useNode, useEditor } from "@craftjs/core";
import { Typography } from "@material-ui/core";

export const Text = ({ text, variant, textAlign, border }) => {

	const { enabled } = useEditor((state) => ({
		enabled: state.options.enabled
	}));

	const { connectors: { connect, drag }, selected, actions: { setProp } } = useNode((state) => ({
		selected: state.events.selected,
		dragged: state.events.dragged
	}));

	const [editable, setEditable] = useState(false);

	let sanitizeConf = {
		allowedTags: [],
		allowedAttributes: {}
	};

	useEffect(() => {
		if (!selected) {
			setEditable(false);
		}
	}, [selected]);

	return (
		<Typography ref={ref => connect(drag(ref))} variant={variant}>
			<ContentEditable
				html={text}
				disabled={!editable || !enabled}
				onClick={() => setEditable(true)}
				onBlur={() => setEditable(false)}
				onChange={e =>
					setProp(props => {
						let html = e.target.value;
						html = sanitizeHtml(html, sanitizeConf)

						props.text = html;
					})}
				tagName="div"
				style={{ textAlign }}
				onKeyDown={(event) => {
					if (event.key === 'Enter') {
						document.execCommand('insertLineBreak')
						event.preventDefault()
					}
				}}
			/>
		</Typography>
	)
}