import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGE, USER_ICON } from "../utils/constants";
import useBreakpoints from "../hooks/useBreakpoints";
import search from "../icons/search.png";
import { toggleGptSearch } from "../utils/gptSearchSlice";
import { changeLanguage } from "../utils/configSlice";
import home from "../icons/home.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const enableGptSearch = useSelector(
    (store) => store.gptSearch.enableGptSearch
  );
  const languageName = useSelector((store) => store.config.language);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleGptSearch = () => {
    dispatch(toggleGptSearch());
  };

  const handleChangeLanguage = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const { isTablet, isDesktop } = useBreakpoints();

  return (
    <div className="absolute z-10 px-[3rem] py-4 w-full flex justify-between bg-gradient-to-b from-black/100">
      <div className="flex items-center">
        <img className="w-[20%]" src={LOGO} alt="logo" />
      </div>

      {user && (
        <div className="flex items-center shrink-0">
          {(isTablet || isDesktop) && (
            <p className="p-2 font-bold text-white">
              Hello {user.displayName}!
            </p>
          )}
          <button onClick={handleGptSearch}>
            {enableGptSearch ? (
              <img className="mx-2" src={home} />
            ) : (
              <img className="mx-2" src={search} />
            )}
          </button>
          {enableGptSearch && (
            <select
              className="border border-black bg-black text-white font-medium rounded-sm px-2 py-1.5 self-stretch text-xs sm:text-sm md:self-center"
              onChange={handleChangeLanguage}
            >
              {SUPPORTED_LANGUAGE.map((lang) => (
                <option
                  key={lang.id}
                  value={lang.id}
                  selected={languageName == lang.id}
                >
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <img className="mx-2 rounded-sm" src={USER_ICON} alt="user-icon" />
          <button
            className="border border-red-700 bg-red-700 text-white font-medium rounded-sm px-2 py-1.5 self-stretch text-xs sm:text-sm md:self-center"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
