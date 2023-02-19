

interface iProps {company:boolean,t:Function,followings?:any[],followers?:any[]}
export const FollowersFollowing=({company,t,followers,followings}:iProps)=>{

    return (
        <div className="fowllowingFollowers">
            {company?
             <div className="bg double double-width">
                <div className="mx-1">
                    <span>{followings?followings.length:0}</span>
                    <span>{t("Following")}</span>
                </div>
                <div className="verticalLine" />
                <div className="mx-1">
                    <span>{followers && followers.length>0?followers.length:0}</span>
                    <span>{t("Followers")}</span>
                </div>
             </div>
             :<div className="bg single single-width">
                 <div>
                    <span>{followings && followings.length>0 ?followings.length:0}</span>
                    <span>{t("Following")}</span>
                 </div>
             </div>
            }
        </div>
    )
}