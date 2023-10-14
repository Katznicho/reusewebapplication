import { XIcon } from "@heroicons/react/outline";
import React from "react";
import { FiAlertCircle, FiPlus } from "react-icons/fi";
import Modal from "../common/Modal";
import { Input, TextArea, Loader, Alert } from "../../components";
import {
  clearMessage,
  create_blog,
  upload_blog_image,
} from "../../actions/firebaseAction";
import { useDispatch, useSelector } from "react-redux";
const SectionTitle = ({ title, subtitle, right = null }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [file, setFile] = React.useState("");

  const handleInputChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const { firebase } = useSelector((state) => ({
    firebase: state.firebase,
  }));

  const { uploading, image, current_user, users, success, message, reason } = {
    ...firebase,
  };

  const currentUser = users.find((user) =>
    current_user ? user.id === current_user : null
  );


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    dispatch(upload_blog_image(file));
  };
  React.useEffect(() => {
    if (success) {
      dispatch(create_blog(description, image, currentUser));
    }
  }, [currentUser, description, dispatch, image, success]);

  return (
    <div className="w-full mb-6 pt-3">
      <div>
        {message && reason === "blog" ? (
          <div className="w-full mb-4">
            {(message !== null || message !== undefined) && (
              <Alert
                error={`text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800`}
                icon={<FiAlertCircle className="mr-2 stroke-current h-4 w-4" />}
                onClick={() => dispatch(clearMessage())}
              >
                {message}
              </Alert>
            )}
          </div>
        ) : null}
      </div>
      <div className="flex flex-row items-center justify-between mb-4">
        <div className="flex flex-col">
          <div className="text-xs uppercase font-light text-grey-500">
            {title}
          </div>
          <div className="text-xl font-bold">{subtitle}</div>
        </div>
        <div className="flex-shrink-0 space-x-2">
          <button
            className="btn btn-default btn-rounded btn-icon bg-tunziblue hover:bg-tunziblue text-white space-x-1"
            onClick={() => setOpen(true)}
          >
            <FiPlus className="stroke-current text-white" size={16} />
            <span>Create a Blog</span>
          </button>
        </div>
      </div>
      <div>
        <Modal
          title="Create Blogs"
          icon={<XIcon className="w-5 h-5 text-red-500 hover:text-red-600" />}
          open={open}
          setOpen={setOpen}
          handleSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4 p-4">
            <TextArea
              title="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            />
            <Input type="file" accept="image/*" onChange={handleInputChange} />
            <div>
              <button
                className="btn btn-default btn-rounded btn-icon bg-tunziblue hover:bg-tunziblue text-white space-x-1"
                type="submit"
              >
                {uploading ? <Loader /> : <span>Create a Blog</span>}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SectionTitle;
