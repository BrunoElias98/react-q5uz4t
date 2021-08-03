import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Card,
    CardHeader,
    Grid,
    Divider,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    TableFooter,
} from '@material-ui/core';
import { formatPrice } from 'src/utils/functions.js';

export default function OrderItems({ order }) {
    const [translate, i18n] = useTranslation();
    return (
        <Grid
            container
            spacing={3}
        >
            <Grid
                item
                md={12}
                xl={12}
                xs={12}
            >
                <Card>
                    <CardHeader title={translate('titleOrderItemsTableCell')} />
                    <Divider />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    {translate('titleProductsTableCell')}
                                </TableCell>
                                <TableCell>
                                    {translate('titleSKUTableCell')}
                                </TableCell>
                                <TableCell>
                                    {translate('titlePriceTableCell')}
                                </TableCell>
                                <TableCell>
                                    {translate('titleQuantityTableCell')}
                                </TableCell>
                                <TableCell>
                                    {translate('titleSubtotalTableCell')}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {order.items.map(item =>
                                <TableRow>
                                    <TableCell>
                                        {item.name}
                                    </TableCell>
                                    <TableCell>
                                        {item.sku}
                                    </TableCell>
                                    <TableCell>
                                        {formatPrice(item.price)}
                                    </TableCell>
                                    <TableCell>
                                        {item.quantity}
                                    </TableCell>
                                    <TableCell>
                                        {formatPrice(item.price * item.quantity)}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={3}></TableCell>
                                <TableCell>Subtotal</TableCell>
                                <TableCell>{formatPrice(order.totalPrice)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={3}></TableCell>
                                <TableCell>Frete</TableCell>
                                <TableCell>{formatPrice(order.totalShipping)}</TableCell>
                            </TableRow>
                            {order.totalDiscount>0 && (
                                <TableRow>
                                    <TableCell colSpan={3}></TableCell>
                                    <TableCell>Desconto</TableCell>
                                    <TableCell>{formatPrice(order.totalDiscount)}</TableCell>
                                </TableRow>
                            )}
                            <TableRow>
                                <TableCell colSpan={3}></TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell>{formatPrice(order.totalFinal)}</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </Card>
            </Grid>
        </Grid>
    )
}
