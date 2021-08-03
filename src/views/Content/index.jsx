import React from 'react';
import { Box as BoxMaterial } from '@material-ui/core';
import Page from 'src/components/Page';
import { Container } from 'src/components/Content/Container';
import { Button } from 'src/components/Content/Button';
import { Card } from 'src/components/Content/Card';
import { Text } from 'src/components/Content/Text';
import { GridContainer } from 'src/components/Content/Grid';
import { GridItem } from 'src/components/Content/Grid';
import { SliderBanner } from 'src/components/Content/SliderBanner';
import { SliderProduct } from 'src/components/Content/SliderProduct';
import { GridProducts } from 'src/components/Content/GridProducts';
import { Box } from 'src/components/Content/Box';
import { Editor, Frame, Element } from "@craftjs/core";

export default function ContentIndex({ content }) {
    return (
        <Page
            title=""
        >
            <BoxMaterial mb={5}>
                <Editor
                    enabled={false}
                    resolver={{
                        Container,
                        Button,
                        Text,
                        GridProducts,
                        SliderBanner,
                        SliderProduct,
                        Card,
                        Container,
                        GridItem,
                        GridContainer,
                        Box
                    }}>
                    <Frame data={content.json}>
                        <Element is='div' padding={5} background="#eee" canvas>
                        </Element>
                    </Frame>
                </Editor>
            </BoxMaterial>
        </Page>
    )
}