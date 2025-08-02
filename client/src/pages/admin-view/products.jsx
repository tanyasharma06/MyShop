import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet , SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice";
import Comment_ from "postcss/lib/comment";
import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
const initialFormData = {
  image:null,
  title:'',
  description:'',
  category:'',
  brand:'',
  price:"",
  salePrice:'',
  totalStock:'',
}
function AdminProducts() {
  const [openCreateProductsDialog , setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    console.log(formData, "formData");
  }, [formData]);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [ imageLoadingState , setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const {productList} = useSelector(state=>state.adminProducts);
  const dispatch = useDispatch();

  function onSumbit(event){
    event.preventDefault();
     currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");
             if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
          }
        }):
    dispatch(addNewProduct({
      ...formData,
      image:uploadedImageUrl ,
    })).then((data)=>{
      console.log(data);
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
        setOpenCreateProductsDialog(false);
        setImageFile(null);
        setFormData(initialFormData);
        toast.success("Product added successfully");
      }
    })
  }
  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }
  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }
  useEffect(()=>{
    dispatch(fetchAllProducts())


  },[dispatch]);
  console.log(productList, uploadedImageUrl,"productList");
    return ( 
        <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick ={()=>setOpenCreateProductsDialog(true)} className="bg-primary text-primary-foreground">
          Add New Product
        </Button>
        </div>
        <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-4fff">
          {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                key={productItem._id || productItem.id}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}

        </div>
          <Sheet open ={openCreateProductsDialog} onOpenChange={()=>{
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
            setFormData(initialFormData);
          }}>
            <SheetContent side="right" className="overflow-auto max-w-md p-6">
              <SheetHeader>
                <SheetTitle>
                  {
                    currentEditedId !== null ? "Edit Product" : "Add New Product"
                  }
                </SheetTitle>

              </SheetHeader>
              <ProductImageUpload imageFile ={imageFile} setImageFile ={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState} imageLoadingState={imageLoadingState}
              isEditMode={currentEditedId !== null} />
              <div className="py-6">
                <CommonForm onSubmit={onSumbit}
                formData={formData} setFormData={setFormData} buttonText={
                  currentEditedId !== null ? "Update Product" : "Add Product"
                }
                formControls={addProductFormElements} 
                isBtnDisabled={!isFormValid()}
                />

              </div>
              
            </SheetContent>

          </Sheet>
    </Fragment>
    
     );
}

export default AdminProducts;