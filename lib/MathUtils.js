/**
 * @constructor
 */
class MathUtils {

    /**
     * 判断两个长方体是否相交
     * @param p1 {{x: number, y: number}} 长方体对角线交点
     * @param p2 {{x: number, y: number}} 长方体对角线交点
     * @param q1 {{x: number, y: number}} 长方体对角线交点
     * @param q2 {{x: number, y: number}} 长方体对角线交点
     * @return {boolean}
     * @constructor
     */
    static IsRectCross(p1, p2, q1, q2) {
        return Math.min(p1.x, p2.x) <= Math.max(q1.x, q2.x) &&
            Math.min(q1.x, q2.x) <= Math.max(p1.x, p2.x) &&
            Math.min(p1.y, p2.y) <= Math.max(q1.y, q2.y) &&
            Math.min(q1.y, q2.y) <= Math.max(p1.y, p2.y);
    }

    /**
     * 判断线段是否有交点(跨立判断)
     * @param p1 {{x: number, y: number}} 线p上一点
     * @param p2 {{x: number, y: number}} 线p上一点
     * @param q1 {{x: number, y: number}} 线q上一点
     * @param q2 {{x: number, y: number}} 线q上一点
     * @return {boolean}
     * @constructor
     */
    static IsLineSegmentCross2(p1, p2, q1, q2) {

        let u = (q1.x - p1.x) * (p2.y - p1.y) - (p2.x - p1.x) * (q1.y - p1.y);
        let v = (q2.x - p1.x) * (p2.y - p1.y) - (p2.x - p1.x) * (q2.y - p1.y);
        let w = (p1.x - q1.x) * (q2.y - q1.y) - (q2.x - q1.x) * (p1.y - q1.y);
        let z = (p2.x - q1.x) * (q2.y - q1.y) - (q2.x - q1.x) * (p2.y - q1.y);
        return (u * v <= 0.00000001 && w * z <= 0.00000001);
    }

    /**
     * 判断线段是否有交点(跨立判断)
     * @param p1 {{x: number, y: number}} 线p上一点
     * @param p2 {{x: number, y: number}} 线p上一点
     * @param q1 {{x: number, y: number}} 线q上一点
     * @param q2 {{x: number, y: number}} 线q上一点
     * @return {boolean}
     * @constructor
     */
    static IsLineSegmentCross(p1, p2, q1, q2) {

        let line1 = p1.x * (q1.y - p2.y) + p2.x * (p1.y - q1.y) + q1.x * (p2.y - p1.y);
        let line2 = p1.x * (q2.y - p2.y) + p2.x * (p1.y - q2.y) + q2.x * (p2.y - p1.y);
        if (((line1 ^ line2) >= 0) && !(line1 == 0 && line2 == 0))
            return false;

        line1 = q1.x * (p1.y - q2.y) + q2.x * (q1.y - p1.y) + p1.x * (q2.y - q1.y);
        line2 = q1.x * (p2.y - q2.y) + q2.x * (q1.y - p2.y) + p2.x * (q2.y - q1.y);
        if (((line1 ^ line2) >= 0) && !(line1 == 0 && line2 == 0))
            return false;
        return true;
    }

    /**
     * 计算两条线交点
     * @param p1 {{x: number, y: number}} 线p上一点
     * @param p2 {{x: number, y: number}} 线p上一点
     * @param q1 {{x: number, y: number}} 线q上一点
     * @param q2 {{x: number, y: number}} 线q上一点
     * @return {{x: number, y: number}}
     */
    static computerFocus(p1, p2, q1, q2) {
        let tmpLeft = (q2.x - q1.x) * (p1.y - p2.y) - (p2.x - p1.x) * (q1.y - q2.y);
        let tmpRight = (p1.y - q1.y) * (p2.x - p1.x) * (q2.x - q1.x) + q1.x * (q2.y - q1.y) * (p2.x - p1.x) - p1.x * (p2.y - p1.y) * (q2.x - q1.x);

        if (tmpLeft === 0) return null;
        let x = tmpRight / tmpLeft;

        tmpLeft = (p1.x - p2.x) * (q2.y - q1.y) - (p2.y - p1.y) * (q1.x - q2.x);
        tmpRight = p2.y * (p1.x - p2.x) * (q2.y - q1.y) + (q2.x - p2.x) * (q2.y - q1.y) * (p1.y - p2.y) - q2.y * (q1.x - q2.x) * (p2.y - p1.y);
        if (tmpLeft === 0) return null;
        let y = tmpRight / tmpLeft;

        return {x: x, y: y};
    }

    /**
     * 获取线段上交点坐标
     * @param p1 {{x: number, y: number}} 线p上一点
     * @param p2 {{x: number, y: number}} 线p上一点
     * @param q1 {{x: number, y: number}} 线q上一点
     * @param q2 {{x: number, y: number}} 线q上一点
     * @return {null|{x: number, y: number}}
     * @constructor
     */
    static GetLineSegmentCrossPoint(p1, p2, q1, q2) {

        if (this.IsRectCross(p1, p2, q1, q2)) {
            if (this.IsLineSegmentCross(p1, p2, q1, q2)) {
                return this.computerFocus(p1, p2, q1, q2)
            }
        }

        return null;
    }

    //  The function will return YES if the point x,y is inside the polygon, or
    //  NO if it is not.  If the point is exactly on the edge of the polygon,
    //  then the function may return YES or NO.
    static IsPointInPolygon(poly, pt) {

        let c = false;

        for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
            if ((((poly[i].y <= pt.y) && (pt.y < poly[j].y)) || ((poly[j].y <= pt.y) && (pt.y < poly[i].y)))
                && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)) {
                c = !c;
            }
        }
        return c;
    }

    /**
     * 若点a大于点b,即点a在点b顺时针方向,返回true,否则返回false
     * @param a
     * @param b
     * @param center
     * @return {boolean}
     * @constructor
     */
    static PointCmp(a, b, center) {
        if (a.x >= 0 && b.x < 0) return true;
        if (a.x === 0 && b.x === 0) return a.y > b.y;

        //向量OA和向量OB的叉积
        let det = (a.x - center.x) * (b.y - center.y) - (b.x - center.x) * (a.y - center.y);
        if (det < 0) return true;
        if (det > 0) return false;

        //向量OA和向量OB共线，以距离判断大小
        let d1 = (a.x - center.x) * (a.x - center.x) + (a.y - center.y) * (a.y - center.y);
        let d2 = (b.x - center.x) * (b.x - center.y) + (b.y - center.y) * (b.y - center.y);
        return d1 > d2;

    }

    /**
     * 顺时针排序点
     * @param vPoints
     * @constructor
     */
    static ClockwiseSortPoints(vPoints) {
        //计算重心
        let center = {
            x: 0,
            y: 0
        };
        let x = 0, y = 0;
        for (let i = 0; i < vPoints.length; i++) {
            x += vPoints[i].x;
            y += vPoints[i].y;
        }
        center.x = x / vPoints.length;
        center.y = y / vPoints.length;

        //冒泡排序
        for (let i = 0; i < vPoints.length - 1; i++) {

            for (let j = 0; j < vPoints.length - i - 1; j++) {

                if (this.PointCmp(vPoints[j], vPoints[j + 1], center)) {
                    let tmp = vPoints[j];
                    vPoints[j] = vPoints[j + 1];
                    vPoints[j + 1] = tmp;
                }

            }
        }
    }

    static PolygonClip(poly1, poly2, interPoly) {

        if (poly1.length < 3 || poly2.length < 3) return false;

        let x, y;
        // 计算多边形交点
        for (let i = 0; i < poly1.length; i++) {
            let poly1_next_idx = (i + 1) % poly1.length;

            for (let j = 0; j < poly2.length; j++) {
                let poly2_next_idx = (j + 1) % poly2.length;

                let point = this.GetLineSegmentCrossPoint(poly1[i], poly1[poly1_next_idx], poly2[j], poly2[poly2_next_idx])
                if (point) {
                    interPoly.push(point);
                }
            }
        }

        // 计算多边形内部点
        for (let i = 0; i < poly1.length; i++) {

            if (this.IsPointInPolygon(poly2, poly1[i])) {
                interPoly.push(poly1[i]);
            }
        }
        for (let i = 0; i < poly2.length; i++) {
            if (this.IsPointInPolygon(poly1, poly2[i])) {
                interPoly.push(poly2[i]);
            }
        }

        if (interPoly.length <= 0) return false;

        // 点集排序
        this.ClockwiseSortPoints(interPoly);

        return true;
    }
}

export {MathUtils};