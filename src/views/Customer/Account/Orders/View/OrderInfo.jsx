import React from 'react';
import moment from 'moment';
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
    Button,
    Link
} from '@material-ui/core';
import Label from 'src/components/Label';
import ClassOrder from 'src/models/OrderModels';
import AddressModel from 'src/models/AddressModel';
import { formatPrice } from 'src/utils/functions.js';
import { useSelector } from 'react-redux';

export default function OrderInfo({ order }) {
    const store = useSelector((state) => state.interface.store);
    const [translate, i18n] = useTranslation();
    
    let classOrder = new ClassOrder();
    classOrder.setData(order);

    let addressModel = new AddressModel();
    addressModel.setData({
        name: order.shipment.addressName,
        street: order.shipment.addressStreet,
        district: order.shipment.addressDistrict,
        number: order.shipment.addressNumber,
        complement: order.shipment.addressComplement,
        zipcode: order.shipment.addressZipcode,
        region: order.shipment.addressRegion,
        city: order.shipment.addressCity,
    });
    
    return (
        <Grid
            container
            spacing={3}
        >
            <Grid
                item
                md={6}
                xs={12}
            >
                <Card>
                    <CardHeader title="Pedido" />
                    <Divider />
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>{translate('titleDateTableOrder')}</TableCell>
                                <TableCell>
                                    {moment(order.createdAt.date).format('DD/MM/YYYY HH:MM')}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{translate('titleStatusTableOrder')}</TableCell>
                                <TableCell>
                                    <Label variant="outlined">
                                        {classOrder.getStatusLabel()}
                                    </Label>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
            </Grid>
            <Grid
                item
                md={6}
                xs={12}
            >
                <Card>
                    <CardHeader title="Entrega" />
                    <Divider />
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>{translate('titleShippingCompanyTableCell')}</TableCell>
                                <TableCell>
                                    {order.shipment !== null && (
                                        <>
                                            <div>
                                                {classOrder.getShipmentLabel()} - {formatPrice(order.shipment.total)}
                                            </div>
                                            <div>
                                                Em até {order.shipment.deliveryTime}&nbsp;
                                                {order.shipment.deliveryTime === 1 ?
                                                    translate('infoShippingQuoteWithOneDay'):
                                                    translate('infoShippingQuote')
                                                }
                                            </div>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{translate('typographyAddressCustomer')}</TableCell>
                                <TableCell>
                                    <div>{addressModel.getAddressLabel()}</div>
                                    <div>{order.shipment.addressCity}/{order.shipment.addressRegion}</div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
            </Grid>
            {order.transaction !== null && (
                <Grid
                    item
                    md={12}
                    xl={12}
                    xs={12}
                >
                    <Card>
                        <CardHeader title="Pagamento" />
                        <Divider />
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        {translate('titleTransactionMethodTableHead')}
                                    </TableCell>
                                    <TableCell>
                                        {translate('titleTransactionTotalTableHead')}
                                    </TableCell>
                                    {order.transaction.additionalInformation.paymentLink && order.status === 'pending' && (
                                        <TableCell>
                                            {translate('titleTransactionLinkTableHead')}
                                        </TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        {classOrder.getTransactionLabel()}
                                    </TableCell>
                                    <TableCell>
                                        {formatPrice(order.transaction.total)}
                                    </TableCell>

                                    {order.transaction.additionalInformation.paymentLink && order.status === 'pending' && (
                                        <TableCell>
                                            <Button
                                                component={Link}
                                                href={`${order.transaction.additionalInformation.paymentLink}`}
                                                target="_blank"
                                                variant="contained"
                                                color="primary"
                                                underline="none"
                                            >
                                                Pagar
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                </Grid>
            )}
        </Grid>
    )
}