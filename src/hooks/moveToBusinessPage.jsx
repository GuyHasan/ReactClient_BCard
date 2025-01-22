import { useNavigate } from "react-router-dom";

export const useMoveToBusinessPage = () => {
	const navigate = useNavigate();
	const moveToBusinessPage = (businessId) => {
		navigate(`/cards/${businessId}`);
	};

	return moveToBusinessPage;
};
