import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Typography,
    IconButton,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    Card,
    Avatar
} from '@material-ui/core';
import Label from 'src/components/Label';
import {
    Edit as EditIcon,
    Box as BoxIcon,
    Trash as TrashIcon
} from 'react-feather';
import ClassReview from 'src/models/ReviewsModel';
import DialogComponentReview from 'src/views/Customer/Account/Reviews/List/Dialog';
import DialogComponent from 'src/components/Dialog/Dialog';

export default function GridReview({
    reviews,
    onEditReview,
    setStateModalEdit,
    stateDialogEdit,
    stateDialogAdd,
    setStateModalAdd,
    onDelete,
    review,
    fetchReviews,
    orders,
    orderId,
    productId,
}) {

    const [translate, i18n] = useTranslation();
    let classReview = new ClassReview();
    const [reviewId, setReviewId] = useState("");
    const [stateDialogDelete, setStateDialogDelete] = useState(false);

    const editReview = (id) => {
        setStateModalEdit();

        onEditReview(id);
    };

    const deleteReviewById = (id) => {
        setReviewId(id);
        setStateDialog();

        if (stateDialogDelete) {
            onDelete(reviewId);
        }
    };

    const setStateDialog = () => {
        stateDialogDelete ? setStateDialogDelete(false) : setStateDialogDelete(true);
    }

    return (
        <Card>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>
                            {translate('gridProductHeader')}
                        </TableCell>
                        <TableCell>
                            {translate('gridDescriptionHeader')}
                        </TableCell>
                        <TableCell>
                            {translate('gridRatingHeader')}
                        </TableCell>
                        <TableCell>
                            {translate('gridRecommendedHeader')}
                        </TableCell>
                        <TableCell>
                            {translate('gridStatusHeader')}
                        </TableCell>
                        <TableCell />
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reviews.length ? (
                        reviews.map(review => {
                            const { description, rating, recommended, status, product, id } = review;

                            return (
                                <TableRow key={id}>
                                    <TableCell>
                                        <Avatar src={product.medias.length > 0 ? product?.medias[0].url : ''}><BoxIcon /></Avatar>
                                    </TableCell>
                                    <TableCell>
                                        {product.name}
                                    </TableCell>
                                    <TableCell>
                                        {description.length > 25 ? description.substring(0, 25) + '...' : description}
                                    </TableCell>
                                    <TableCell>
                                        {rating}
                                    </TableCell>
                                    <TableCell>
                                        {classReview.getRecommendedLabel(recommended)}
                                    </TableCell>
                                    <TableCell>
                                        <Label variant="outlined">
                                            {classReview.getStatusLabel(status)}
                                        </Label>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => deleteReviewById(id)}>
                                            <TrashIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => editReview(id)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} align="center"><Typography variant="h6">{translate('customerNotHaveReviews')}</Typography></TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {stateDialogEdit &&
                <DialogComponentReview
                    state={stateDialogEdit}
                    title=''
                    review={review}
                    fetchReviews={fetchReviews}
                    orders={orders}
                    orderId={orderId}
                    productId={productId}
                    handleClose={setStateModalEdit}
                />}

            {stateDialogAdd &&
                <DialogComponentReview
                    state={stateDialogAdd}
                    title=''
                    review={{}}
                    fetchReviews={fetchReviews}
                    stateDialogAdd={stateDialogAdd}
                    orders={orders}
                    orderId={orderId}
                    productId={productId}
                    handleClose={setStateModalAdd}
                />}

            {stateDialogDelete &&
                <DialogComponent
                    state={stateDialogDelete}
                    title=''
                    text='Você gostaria de deletar esta avaliação?'
                    buttonClose='Cancelar'
                    buttonSubmit='Deletar'
                    handleClose={() => setStateDialog()}
                    handleSubmit={() => deleteReviewById()}
                />}
        </Card>
    )
}
