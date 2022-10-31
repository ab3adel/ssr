

interface iProps {company:boolean,t:Function}
export const FollowersFollowing=({company,t}:iProps)=>{

    return (
        <div className="fowllowingFollowers">
            {company?
             <div className="bg double double-width">
                <div className="mx-1">
                    <span>35</span>
                    <span>{t("Following")}</span>
                </div>
                <div className="verticalLine" />
                <div className="mx-1">
                    <span>35</span>
                    <span>{t("Following")}</span>
                </div>
             </div>
             :<div className="bg single single-width">
                 <div>
                    <span>35</span>
                    <span>{t("Following")}</span>
                 </div>
             </div>
            }
        </div>
    )
}